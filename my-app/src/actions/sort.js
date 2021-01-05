
export const sort =(sortBy,products)=>{
    
  const compare = {
      lowestprice: (a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
      },
      highestprice: (a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        return 0;
      }
    };
  // console.log("products",products)
  // console.log("sort",sortBy)
    
  // products&&products.sort(compare[sortBy]);
  products.sort(compare[sortBy]);
    return {
        type:"SORT",    
        payload:products
    }
} 