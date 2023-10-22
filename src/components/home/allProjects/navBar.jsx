
import './style.css'
import { Radio, Input } from "antd";
const {Search} = Input
const NavBar =({setSearch , filterProjects , search, setSelected , setSearchOpen , setPageNo , searchOpen })=>{

    return <div className="navbar">
    <div className='homeContainer '>
      <button  onClick={()=>{setSearchOpen(false); setSearch([]); setPageNo(0);}} >Home</button>
    </div  >
        <div style={{width:'10%'}}></div>
        <div key={searchOpen} className="searchInput" >
        <Search
         
          value={search.join(",")}
          placeholder="Input search text"
          size = "large"
          onChange={(e,value)=>{setSearch(e.target.value.split(',')); if(e.target.value==""){ setSearchOpen(false)} }}
          onSearch={()=>{setPageNo(0);
              filterProjects();
            }
          }
        />
        </div>
        <div className="navbar_empty"></div>
        <div className="search_container">
          <Radio.Group onChange={(event)=>{setSelected(event.target.value);}} buttonStyle="solid" defaultValue="1">
            <Radio.Button value="1">Search</Radio.Button>
            <Radio.Button value="2">Smart Search</Radio.Button>
          </Radio.Group>
        </div>

  </div>
}
export default NavBar ;