
const filter=(selected,products,size)=>{
    // console.log("f", selected,products,size)
   
    if (!!selected && selected.length > 0) {
        products = products.filter(p =>
            selected.find(f => p.availableSizes.find(size => size === f))
        );
    } else{
        selected=[]
    }
    return {
        type:'FILTER',
        filter:selected,
        payload:products,
        size:size
    }
}
export default filter;

