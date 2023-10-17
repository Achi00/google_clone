import axios from 'axios';
import { useEffect, useState } from 'react'
import Landing from '../components/Landing';
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Images = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [related, setRelated] = useState(null)

    useEffect(() => {
        if (searchClicked) {
          setIsLoading(true); // Start loading when search is clicked
            const options = {
                method: 'GET',
                url: 'https://bing-image-search1.p.rapidapi.com/images/search',
                params: { q: query },
                headers: {
                  'X-RapidAPI-Key': '532606fd5amshbfdbc1bd5ff8f44p190eb2jsnc5d1642e27ba',
                  'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
                }
              };
    
          const fetchData = async () => {
            try {
              const response = await axios.request(options);
              setResults(response.data.value);
              setRelated(response.data.relatedSearches)
            } catch (error) {
              console.error(error);
            } finally {
              setIsLoading(false); // Stop loading when data is received or an error occurred
            }
          }
    
          fetchData();
        }
      }, [searchClicked, query]);

      const clearResults = () => {
        setResults(null);
        setSearchClicked(false);
        setQuery('');
        setInputValue('');
      };

      // related search icons slider
      const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
      }
      const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
      }

      function truncateText(text, length) {
        if (text.length > length) {
            return text.substring(0, length) + '...';
        } else {
            return text;
        }
    }
      
  return (
    <>     
    {isLoading ? (
      <Loading />
    ) : (
      <>
      <button 
          className='p-4 flex items-center text-3xl cursor-pointer relative z-10' 
          onClick={clearResults}>
            <FcGoogle className='mt-1' size={30}/>OOGLE
          </button>
          <div className='flex flex-row gap-5 relative z-10'>
            <Link to="/">All</Link>
            <Link to="/images">images</Link>
          </div>
      <div className='lg:px-[2rem] md:px-[1rem] sm:px-[1rem] xs:px-[0rem]'>  
        <div>
          {searchClicked && results ? (
            <div>
              <div className='p-5'>
                <form
                className='w-[450px]'
                onSubmit={e => {
                    e.preventDefault();
                    if (inputValue !== '') {
                        setQuery(inputValue);
                        setSearchClicked(true);
                    }
                }}
                >
                  <div className="relative lg:w-[450px] md:w-[350px] sm:w-[300px] xs:w-[250px]">
                     <input 
                     className='border-gray-300 border outline-none lg:w-[450px] md:w-[350px] sm:w-[300px] xs:w-[250px] drop-shadow-xl p-1 rounded-xl pl-7 pr-[6rem]'
                     type="text" 
                     autoComplete="off"
                     name="query"
                     value={inputValue} 
                         onChange={(e) => setInputValue(e.target.value)} 
                    />
                      <AiOutlineSearch 
                        className="absolute top-1/2 left-2 transform -translate-y-1/2"
                      />
                      <button 
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center gap-2 px-1 text-md" 
                        type="submit"
                      >
                        search <FcGoogle />
                      </button>
                  </div>
                </form>
              </div>
              <div id='slider' className="flex overflow-x-auto gap-2 w-full scroll-smooth scrollbar-hide">
              <IoIosArrowBack onClick={slideLeft} className='bg-white text-black left-5 rounded-full absolute z-20 cursor-pointer' size={40} />
                {related && related.map((related, index) => (
                  <div key={index} className='border border-gray-300 rounded-lg flex flex-row  hover:drop-shadow-2xl h-10'>
                    <button 
                    onClick={() => {
                      setQuery(related?.text);
                      setSearchClicked(true);
                    }}
                    className='w-[200px]'>
                      <h1 className='flex flex-row items-center justify-center gap-2'><AiOutlineSearch />{truncateText(related?.text, 20)}</h1>
                    </button>
                  </div>
                ))}
                <IoIosArrowForward onClick={slideRight} className='bg-white text-black right-5 rounded-full absolute z-20 cursor-pointer' size={40} />
              </div>
              <div className='flex flex-wrap justify-center items-start'>
              {results.map((result, index) => (
                <Link to={result?.hostPageUrl} key={index} className='flex flex-col p-5'>
                  <div className='relative p-1'>
                    <img
                      width={300}
                      className='rounded-md hover:drop-shadow-2xl object-cover'
                      src={result?.contentUrl}
                      alt={result?.displayText}
                    />
                  </div>
                  {/* author */}
                  <div className="flex gap-2 pt-2">
                    <img width={25} className='rounded-full' src={result?.hostPageFavIconUrl} alt={result?.displayText} />
                    <h2>{result?.hostPageDomainFriendlyName}</h2>
                  </div>
                  <h2 className='font-botruncateTextld'>{result?.displayText}</h2>
                  <h2 className='w-[200px] text-sm'>{truncateText(result?.name, 30)}</h2>
                </Link>
              ))}
              </div>
            </div>
          ) : (
            <Landing setSearchClicked={setSearchClicked} setQuery={setQuery}/>
          )}
        </div>
      </div>
      </>
    )}

      </>
  )
}

export default Images