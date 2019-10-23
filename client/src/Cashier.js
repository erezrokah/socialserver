import React,{useState,useEffect} from 'react'
import './Cashier.css'

var numberOfItemsBeingBought = 0

const Cashier = () => {

	const [serialNumber,setSerialNumber] = useState(0)
	const [total,setTotal] = useState(0)

	let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

	const [items,setItems] = useState([
	{id:1,item:'soap',price:45,quantity:1},
	{id:2,item:'flour',price:1000,quantity:1},
	{id:3,item:'Cooking Oil',price:1000,quantity:1},
	{id:4,item:'Tissue Roll',price:60,quantity:1},
	{id:5,item:'Lays Mega Pack',price:50,quantity:1}
	])

	const [boughtItems,setBoughtItems] = useState([])

	const enterItem = (e) => {
		e.preventDefault()
		let enteredItem = items.find(item=>item.id==serialNumber)
		enteredItem.index = numberOfItemsBeingBought
		numberOfItemsBeingBought++
		setBoughtItems([...boughtItems,enteredItem])
		// setProcessStarted(true)
	}

	const onQuantityChange = (id,quantityValue) => {
		let editedBoughtItems = boughtItems.map((item)=>{
			// console.log(,id-1)
			// console.log(item.index,id-1)
			if(item.index==id){
				item.quantity = quantityValue
			}
			// index++
			return item
		})
		console.log(editedBoughtItems)
		setBoughtItems(editedBoughtItems)
	}

	const calculateTotal = () => {
		let totalValue = 0
		boughtItems.forEach((item)=>{
			totalValue+=item.price*item.quantity
		})
		return totalValue 
	}


	useEffect(()=>{
		setTotal(calculateTotal)
	},[boughtItems])

	return(
	<div style={{backgroundColor:'rgb(201,1,6)'}}>
		<div className="row" style={{minHeight: '100vh',width:'100%'}}>
			<div className="col-6" style={{display: 'flex',alignItems: 'center',
			justifyContent: 'center'}}>
				<div style={{width:'600px',margin:'80px auto'}}>	
				<form id="search-form" onSubmit={enterItem}>
					<div className="form-group" id="serialNumberEnclosure">
						 {/*<label id="icon"><i className="fas fa-pen"></i></label>*/}
						<input type="text" className="form-control" placeholder="Enter Serial Number" id="serialNumber"
						onChange={(e)=>{
							setSerialNumber(e.target.value)
						}}/>
					</div>
				</form>
			<div className="card" style={{padding:'40px',borderRadius: '20px'}}>	
				<table className="table">
					<tr>
						<th>Id</th>
						<th>Item</th>
						<th>Individual Price</th>
						<th>Quantity</th>
						<th>Total Price</th>
					</tr>
					<tbody id="table-body">
					{
						boughtItems.map((item)=>(
							<tr>
							<td>{item.id}</td>
							<td>{item.item}</td>
							<td>{item.price}</td>
							<td>
								<form class="quantityForm" onSubmit={(e)=>{
									e.preventDefault()
									onQuantityChange(item.id)
								}}>
								<select id="selectbar" onChange={
									(e)=>{
										onQuantityChange(item.index,e.target.value)
									}
								}>
								{
									numbers.map(no=>(
										<option value={no}>{no}</option>
										))
								}
								</select>
								</form>
							</td>
							<td>{item.price*item.quantity}</td>
							</tr>
						))
					}
					</tbody>
					<tfoot>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td id="totalItem"><b>Total:</b> {total}</td>
						</tr>
					</tfoot>	
				</table>

				<button style={{fontSize:'14px',margin:'auto',width:'120px'}} className="btn btn-primary" onClick={()=>{
					setBoughtItems([])
					numberOfItemsBeingBought = 0
				}}><i className="fas fa-shopping-cart"></i> Check Out</button>
			</div>	
		</div>
			</div>
			<div className="col-6" style={{display: 'flex',alignItems: 'center',
			justifyContent: 'center'}}>
			{(boughtItems.length>0)?(
				<div className="card" align="center" style={{padding:'40px'}}>
					<img src={`images/${boughtItems[numberOfItemsBeingBought-1].id}.jpg`} height = '300px' width='300px'
					style={{borderRadius:'20px'}}/>
					<table className="table" style={{marginTop:'20px'}}>
					<tr>
					<th>Id</th>
					<td>{boughtItems[numberOfItemsBeingBought-1].id}</td>
					</tr>
					<tr>
					<th>Item</th>
					<td>{boughtItems[numberOfItemsBeingBought-1].item}</td>
					</tr>
					</table>
				</div>
				):null
			}	
			</div>
		</div>
	</div>
		)
}

export default Cashier