import React,{useEffect,useState} from "react";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import axios from "axios";
import './DisplayBook.css'
import SearchBar  from "../../components/Search/SearchBar"
import { SearchResultsList } from "../../components/Search/SearchResultsList";
const DisplayBook = ()=>{
    useEffect(() => {

        fetchBookData();
    }, []);
    const [BookData, setBookData] = useState([]);
    const [results, setResults] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 5;


    const fetchBookData = async () => {
        try {
        const response = await axios.get('http://localhost:5000/Book');

        setBookData(response.data);
        } catch (error) {
        console.error('Error fetching employee data:', error);
        }
    };
    
    const  formatdate=(isoDate)=>{
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based
        const year = date.getFullYear();

        // Pad day and month with leading zeros if needed
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return formattedDay + ' / ' + formattedMonth + ' / ' + year;

    } 

    const handleSearch = () =>{
        const filteredResults = BookData.filter((book)=>{
            const isGenrematched = selectedGenre === "All" ? true : book.Genre===selectedGenre;
            return isGenrematched;
        })
        setResults(filteredResults);
        setCurrentPage(0);
    }
    const handleGenreChange = (e) =>{
        setSelectedGenre(e.target.value);
    }
 
    const renderTableRows = () => {
        const dataToRender = results.length > 0 ? results : BookData;
    
        const offset = currentPage * perPage;
        const currentPageData = dataToRender.slice(offset, offset + perPage);

        return currentPageData.map((book) => (
          <tr key={book.id}>
            <td>{book.Name}</td>
            <td>{book.Auther}</td>
            <td>{book.Genre}</td>
            <td>{formatdate(book.PublishedDate)}</td>
          </tr>
          
        ));
      };

      const handlePageClick = ({selected}) =>{
        setCurrentPage(selected);
      }
    
    return(
        <div>
           
            <div className='tablemain'>
                <h2>Employee Data</h2>
                <div className="search-section">

                    <SearchBar setResults={setResults} />
                    {results && results.length > 0 && <SearchResultsList results={results} />}  
                    {/* className="Searchtype" /> */}

                    <select value={selectedGenre} onChange={handleGenreChange}>
                        <option value="All">All Genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="SciFi">SciFi</option>
                        <option value="Romance">Romance</option>
                    </select>
                    <button className="search_button" onClick={handleSearch}><FaSearch/></button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Auther</th>
                        <th>Genre</th>
                        <th>PublishedDate</th>
                        
                    </tr>
                    </thead>
                    <tbody>{renderTableRows()} </tbody>
                </table>

                <ReactPaginate className="pagination"
                previousLabel={"<-"} 
                nextLabel={"->"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(
                    (results.length > 0 ? results.length : BookData.length) /
                    perPage
                )}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"} />
            </div>

        </div>
    )
}

export default DisplayBook;