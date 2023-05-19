const date=new Date().toLocaleString('en-us',{month:"long", year:"numeric",day:"numeric"})
console.log(date);

function Day(){
    return <div>. . . . . {date} . . . . .</div>
}
export default Day