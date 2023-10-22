import "./allProjects.css";

const NoElementsFound = ()=>{
    return <div>
        <div  className="messageStyle">
      <div  className="textContainerStyle" >
        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>No items found from the API.</p>
      </div>
      {/* <div className="textContainerStyle">
        <p>Please check your network connection or try again later.</p>
      </div> */}
    </div>
    </div>
}
export default NoElementsFound;