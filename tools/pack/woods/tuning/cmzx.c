// CM codec: identical model for native encoder and wasm decoder.
typedef unsigned char u8; typedef unsigned short u16; typedef unsigned int u32; typedef int i32; typedef unsigned long long u64;
#define MAXNC 16
static int NC=12,TB=22,LIMS=255,LIMF=3,XC=0,FB=0; static double LRK=0,WI=.3; static int RUN=0,CHK=0,FSEL=0; static double L1M=1,L2M=1,LFM=1; static u16 RM[MAXNC*128];
#define MINL 4
#define NX ((RUN?3:2)*NC+3)
#define MAXNX (3*MAXNC+3)
#define MAXIN (1<<20)
#define MAXOUT (1<<21)
static const double LR1=8e-9,LR2=1e-8,LRF=5e-9;
static i32 sq[4096],st[4096]; static u16 Q[4<<24]; static u16 RS2[1024]; static i32 H[MAXNC],IX[MAXNC],BK[MAXNC],X[MAXNX],RF[256],RS[256];
static double W1[256*MAXNX],W2[2048*MAXNX],W3[96*MAXNX],WF[256*4];
static u8 hist[MAXOUT+8]; static i32 MT[1<<20]; static u16 mst[32],A1[65536*33],A2[65536*33];
u8 IN[MAXIN]; u8 OUT[MAXOUT];
#ifndef NATIVE
void* memset(void* d,int c,unsigned long n){u8* p=(u8*)d;while(n--)*p++=(u8)c;return d;}
#endif
static inline double flr(double v){ return __builtin_floor(v); }
static inline i32 cl(i32 v){ return v>2047?2047:v<-2047?-2047:v; }
static inline u32 mul(u32 a,u32 b){ return a*b; }
i32 cmz(i32 dlen,i32 len,i32 enc){
  static const i32 T[33]={1,2,3,6,10,16,27,45,73,120,194,310,488,747,1101,1546,2047,2549,2994,3348,3607,3785,3901,3975,4022,4050,4068,4079,4085,4089,4092,4093,4094};
  for(i32 d=-2048;d<2048;d++){i32 w=d&127,i=(d>>7)+16;sq[d+2048]=(T[i]*(128-w)+T[i+1]*w+64)>>7;}
  i32 pi=0;for(i32 x=-2047;x<=2047;x++){i32 v=sq[x+2048];for(i32 j=pi;j<=v;j++)st[j]=x;pi=v+1;}for(i32 j=pi;j<4096;j++)st[j]=2047;
  for(i32 i=0;i<(4<<TB);i+=4){Q[i]=Q[i+1]=32768;Q[i+2]=Q[i+3]=0;}
  for(i32 c=0;c<256;c++){RF[c]=(i32)(65536.0/(c<LIMF?c+2:LIMF+2));RS[c]=(i32)(65536.0/(c<LIMS?c+2:LIMS+2));}
  for(i32 i=0;i<256*NX;i++)W1[i]=WI; for(i32 i=0;i<2048*NX;i++)W2[i]=WI; for(i32 i=0;i<96*NX;i++)W3[i]=WI; for(i32 i=0;i<MAXNC*128;i++)RM[i]=32768; for(i32 i=0;i<256*4;i++)WF[i]=i%4?.3:.4;
  for(i32 i=0;i<(1<<20);i++)MT[i]=0; for(i32 i=0;i<NC;i++)H[i]=0;
  for(i32 i=0;i<32;i++){i32 pr=(i32)(65535*(1-1.0/((i>>1)+2)));mst[i]=i&1?pr:65535-pr;}
  for(i32 i=0;i<65536*33;i++){i32 d=(i%33-16)*128;A1[i]=A2[i]=(d>2047?4095:sq[d+2048])*16;}
  i32 pos=0,mptr=0,mlen=0,ip=0,op=0; u32 wordh=0,pword=0,x1=0,x2=0xffffffffu,x=0,b1=0,b2=0,b3=0;
  if(!enc)for(i32 k=0;k<4;k++)x=(x<<8)|(ip<dlen?IN[ip++]:255);
  for(i32 n=0;n<len;n++){
    i32 cb=enc?IN[n]:0,c0=1;
    for(i32 bp=0;bp<8;bp++){
      i32 k=0;
      if(bp==0||bp==4)for(i32 j=0;j<NC;j++){u32 h=mul((u32)H[j]+mul(c0,0x2545F491u),0x9E3779B1u);h^=h>>15;h=mul(h,0x85EBCA77u);h^=h>>13;i32 bk=(i32)((h>>(36-TB))<<6);BK[j]=bk; if(CHK){u16 ck=(u16)(h&0xffff)|1; if(Q[bk]!=ck){Q[bk]=ck; for(i32 t=4;t<64;t+=4){Q[bk+t]=Q[bk+t+1]=32768;Q[bk+t+2]=Q[bk+t+3]=0;}}}}
      i32 q=(bp<4?c0:((c0&((1<<(bp-4))-1))|(1<<(bp-4))))<<2;
      for(i32 j=0;j<NC;j++){i32 i=BK[j]+q;IX[j]=i;if(Q[i+2]){X[k++]=st[Q[i+1]>>4];X[k++]=st[Q[i]>>4];}else{X[k++]=0;X[k++]=0;} if(RUN){X[k++]=Q[i+2]?st[RM[j*128+(Q[i+3]&127)]>>4]:0;}}
      i32 mexp=-1,msi=-1;
      if(mlen>0&&((hist[mptr]|256)>>(8-bp))==c0){mexp=(hist[mptr]>>(7-bp))&1;msi=(mlen>15?15:mlen)*2+mexp;X[k++]=st[mst[msi]>>4];X[k++]=mexp?256:-256;}else{X[k++]=0;X[k++]=0;}
      X[k]=256;
      i32 mb=mexp<0?0:mlen<16?1:mlen<32?2:3,m1=c0*NX,m2=(i32)(b1*8+bp)*NX,m3=((mb*3+mexp+1)*8+bp)*NX;
      double d1=0,d2=0,d3=0;for(i32 i=0;i<NX;i++){double v=X[i];d1+=W1[m1+i]*v;d2+=W2[m2+i]*v;d3+=W3[m3+i]*v;}
      i32 s1=cl((i32)flr(d1+.5)),s2=cl((i32)flr(d2+.5)),s3=cl((i32)flr(d3+.5));
      i32 p1=sq[s1+2048],p2=sq[s2+2048],p3=sq[s3+2048],f=(FSEL?c0:bp)*4;
      i32 sf=cl((i32)flr(WF[f]*s1+WF[f+1]*s2+WF[f+2]*s3+.5)),pf=sq[sf+2048];
      i32 s=sf+2048,lo=s>>7,aw=s&127,a1=(i32)(c0|b1<<8)*33+lo,a2=(i32)(((mul(b1|b2<<8|b3<<16,0x9E3779B1u)>>16)^mul(c0,0x9E37u))&65535)*33+lo;
      i32 q1=(A1[a1]*(128-aw)+A1[a1+1]*aw)>>11,q2=(A2[a2]*(128-aw)+A2[a2+1]*aw)>>11; i32 p= FB==0?(2*pf+q1+q2+2)>>2 : FB==1?(pf+q1+2*q2+2)>>2 : FB==2?(pf+q1+q2+1)/3 : (pf+3*q2+2)>>2;p=p<1?1:p>4095?4095:p;
      u32 xm=x1+(u32)(((u64)(x2-x1)*(u32)p)>>12); i32 y;
      if(enc)y=(cb>>(7-bp))&1;else y=x<=xm;
      if(y)x2=xm;else x1=xm+1;
      while(((x1^x2)&0xff000000u)==0){if(enc)OUT[op++]=x2>>24;else x=(x<<8)|(ip<dlen?IN[ip++]:255);x1<<=8;x2=(x2<<8)|255;}
      double lk=LRK>0?1+LRK/(1+pos/4096.0):1; i32 g=y?65535:0,e1=(y<<12)-p1,e2=(y<<12)-p2,e3=(y<<12)-p3,ef=(y<<12)-pf;
      for(i32 i=0;i<NX;i++){double v=X[i];W1[m1+i]+=LR1*L1M*lk*e1*v;W2[m2+i]+=LR2*L2M*lk*e2*v;W3[m3+i]+=LR2*L2M*lk*e3*v;}
      WF[f]+=LRF*LFM*ef*s1;WF[f+1]+=LRF*LFM*ef*s2;WF[f+2]+=LRF*LFM*ef*s3;
      for(i32 j=0;j<NC;j++){i32 i=IX[j],c=Q[i+2];Q[i]+=((g-Q[i])*RF[c])>>16;Q[i+1]+=((g-Q[i+1])*RS[c])>>16;if(c<255)Q[i+2]=c+1; if(RUN){ i32 r=Q[i+3]&127; if(c){ u16*m=&RM[j*128+r]; *m+=(g-*m)>>6; } i32 rl=r>>1,lb=r&1; if(c&&lb==y){ if(rl<63)rl++; } else rl=1; Q[i+3]=(u16)(rl<<1|y); } }
      if(msi>=0)mst[msi]+=(g-mst[msi])>>6;
      A1[a1]+=((g-A1[a1])*(128-aw))>>12;A1[a1+1]+=((g-A1[a1+1])*aw)>>12;A2[a2]+=((g-A2[a2])*(128-aw))>>12;A2[a2+1]+=((g-A2[a2+1])*aw)>>12;
      c0=c0*2+y;
    }
    u32 c=c0&255;if(!enc)OUT[n]=c;hist[pos++]=c;
    if((c>96&&c<123)||(c>64&&c<91)||(c>47&&c<58)||c==95||c==36||c>127)wordh=mul(wordh+c+1,0x2F0F3F1u);else if(wordh){pword=mul(wordh+c,0x3C6EF372u);wordh=0;}else pword=mul(pword+c,0x9E3779B1u);
    if(mlen>0&&hist[mptr]==c){mlen++;mptr++;}else mlen=0;
    if(pos>=MINL){u32 hh=0;for(i32 k=1;k<=MINL;k++)hh=mul(hh+hist[pos-k]+1,0x2F0F3F1u);hh>>=12;
      if(!mlen){i32 cd=MT[hh];if(cd>0){i32 L=0;while(L<65535&&cd-L-1>=0&&hist[cd-L-1]==hist[pos-L-1])L++;if(L>=MINL){mlen=L;mptr=cd;}}}MT[hh]=pos;}
    b3=b2;b2=b1;b1=c;u32 B4=pos>3?hist[pos-4]:0,B5=pos>4?hist[pos-5]:0,B6=pos>5?hist[pos-6]:0,B7=pos>6?hist[pos-7]:0,B8=pos>7?hist[pos-8]:0;
    u32 h2=b1|b2<<8,h3=h2|b3<<16,h4=h3|B4<<24;
    H[0]=0;H[1]=mul(b1+1,0x9E3779B1u);H[2]=mul(h2+65536,0x85EBCA77u);H[3]=mul(h3+16777216,0xC2B2AE3Du);H[4]=mul(h4,0x27D4EB2Fu)^0x165667B1u;
    H[5]=mul(mul(h4,0x165667B1u)^(B5|B6<<8),0x9E3779B1u);H[6]=mul(mul(h4,0x27D4EB2Fu)^(B5|B6<<8|B7<<16),0x85EBCA77u)^mul(B8,0x1234567u);
    H[7]=mul(wordh+mul(pword,0x3C6EF372u),0xC2B2AE3Du);H[8]=mul(b2|b3<<8,0x27D4EB2Fu);H[9]=mul(mul(h4,0x9E3779B1u)^mul(B5,0x85EBCA77u),0x27D4EB2Fu);
    H[10]=mul(wordh,0x85EBCA77u)^mul(b1,0x2F0F3F1u);H[11]=mul(b1|b3<<8,0xC2B2AE3Du)+85;
    { static u32 ppw=0,lastsym=0; if(!((c>96&&c<123)||(c>64&&c<91)||(c>47&&c<58)||c==95||c==36||c>127)){ lastsym=c; } if(n==0){ppw=0;lastsym=0;}
      static u32 prevw=0; if(wordh==0&&prevw!=pword){ppw=prevw;prevw=pword;}
      i32 k=12;
      if(NC>k)H[k++]=mul(wordh+mul(pword,0x3C6EF372u)+mul(ppw,0x2F0F3F1u),0x9E3779B1u);
      if(NC>k)H[k++]=mul(wordh^mul(lastsym+1,0x85EBCA77u),0xC2B2AE3Du);
      if(NC>k)H[k++]=mul(b2|b3<<8|B4<<16,0x165667B1u)+3;
      if(NC>k)H[k++]=mul(h2^mul(B4|B5<<8,0x27D4EB2Fu),0x85EBCA77u)+7; }
    for(i32 k=1;k<NC;k++)H[k]=(i32)((u32)H[k]+mul(k,0x7F4A7C15u));
  }
  if(enc){OUT[op++]=x1>>24;OUT[op++]=255;OUT[op++]=255;OUT[op++]=255;return op;}
  return len;
}
#ifdef NATIVE
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main(int argc,char**argv){for(int a=3;a<argc;a++){char k[16];double v;if(sscanf(argv[a],"%15[^=]=%lf",k,&v)==2){if(!strcmp(k,"NC"))NC=v;else if(!strcmp(k,"TB"))TB=v;else if(!strcmp(k,"LIMS"))LIMS=v;else if(!strcmp(k,"LIMF"))LIMF=v;else if(!strcmp(k,"LRK"))LRK=v;else if(!strcmp(k,"FB"))FB=v;else if(!strcmp(k,"WI"))WI=v;else if(!strcmp(k,"RUN"))RUN=v;else if(!strcmp(k,"CHK"))CHK=v;else if(!strcmp(k,"FSEL"))FSEL=v;else if(!strcmp(k,"L1M"))L1M=v;else if(!strcmp(k,"L2M"))L2M=v;else if(!strcmp(k,"LFM"))LFM=v;}}
  FILE*f=fopen(argv[1],"rb");i32 n=fread(IN,1,MAXIN,f);fclose(f);
  static u8 orig[MAXIN]; memcpy(orig,IN,n); i32 m=cmz(n,n,1); printf("in %d out %d\n",n,m);
  
  if(argc>2&&argv[2][0]=="v"[0]){memcpy(IN,OUT,m); cmz(m,n,0); printf(memcmp(OUT,orig,n)?"MISMATCH\n":"native roundtrip ok\n");} return 0;}
#endif
