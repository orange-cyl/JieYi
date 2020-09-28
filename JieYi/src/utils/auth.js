export function setToken(name,token){
  localStorage.setItem(name,token);
}
export function getToken(){
  return localStorage.getItem("token")
}
export function removeToken(){
  localStorage.removeItem("token")
}