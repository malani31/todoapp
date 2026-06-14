import React,{useRef} from "react";

const TodoForm=({getItem})=>{
    const itemRef=useRef(null); //create refrence to input field

    //function to handle submit form
    const handleSubmit=(event)=>{
        event.preventDefault();
        //check if input field is empty
        if(itemRef.current.value === ''){
            itemRef.current.focus();
        }else{
            const item={
                task:itemRef.current.value,
                completed:false
            }
            getItem(item); //pass item to parent component
            itemRef.current.value=''; //clear input field
        }
    }


    function onKeyEnter(e){
        if(e.keyCode === 13){
            console.log("enter key pressed");
            handleSubmit(e);
        }
    }

    return (
        <form className="mb-3 px-3 text-start d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="Item"
        className="form-control me-2"
        id="item"
        placeholder="Be Amazing!"
        ref={itemRef} // Bind the input element to the reference
        onKeyDown={onKeyEnter}
      />
      <button type="submit" className="btn btn-sm btn-primary my-2">Add</button>
    </form>
    )

}

export default TodoForm;    