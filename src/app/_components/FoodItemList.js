const FoodItemList = () => {
  return (
    <div>
        <h1>Food Item List</h1>
        <table>
            <thead>
                <tr>
                    <td>S.No</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Paneer Tikka</td>
                    <td>250</td>
                    <td>Delicious paneer tikka with special spices</td>
                    <td>Image</td>
                    <td><button>Delete</button> <button>Edit</button></td>
                </tr>
            </tbody>
        </table>
    </div>  
  )
}

export default FoodItemList;