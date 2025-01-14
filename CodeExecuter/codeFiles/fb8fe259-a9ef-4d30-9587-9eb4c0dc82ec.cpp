#include <bits/stdc++.h>
using namespace std;

int main() {

  int n;
  cin>>n;
  vector<int>vec(n);
  for(int i=0;i<n;i++){
    cin>>vec[i];
  }
  int low=-1,high=n;
  while(low+1<high){
    int mid=(high+low)/2;
    if(vec[mid]==0){
      low=mid;
    }else{
      high=mid;
    }
  }
  if(high<n and vec[high]==1){
    cout<<high<<" ";
  }
  else{
    cout<<n<<" ";
  }
  if(low>=0 and vec[low]==0){
    cout<<low<<" ";
  }else{
    cout<<-1<<" ";
  }

  return 0;

}