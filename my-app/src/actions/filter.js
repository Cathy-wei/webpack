
const filter=(selected,products,size)=>{
  
    if(!selected.includes(size)){
            selected=[...selected,size]
        //   console.log('q',selected,selected.includes(size));
            
        }else{
        
            selected=selected.filter(item => item !== size)
        //   console.log("g",selected,selected.includes(size));
                
        }

    if (!!selected && selected.length > 0) {
        products = products.filter(p =>
            selected.find(f => p.availableSizes.find(size => size === f))
        );
    } 
    return {
        type:'FILTER',
        filter:selected,
        payload:products,
        size:size
    }
}
export default filter;

