import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [checkUpadta,setCheckUpdate]=useState(false)

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

function handleDelete(itemReceived){
  const newRecord=items.filter((item)=>{
    if(item.id!=itemReceived.id){
      return item
    }
  })
  setItems(newRecord)
}
  function handleAddItem(newItem) {
    setItems([... items, newItem])
  }

  function handleUpdateItem(updatedItem) {
    setCheckUpdate(!checkUpadta)
    
  }
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  useEffect(() => {
    fetch('http://localhost:4000/items').then(
      (data) => data.json()
    ).then((data1) =>
    setItems(data1)
    )
  }, [checkUpadta]

  )


  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
