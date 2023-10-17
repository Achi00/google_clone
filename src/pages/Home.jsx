import axios from 'axios';
import { useEffect, useState } from 'react';
import Landing from '../components/Landing';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Home = () => {
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState(null);
    const [searchClicked, setSearchClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (searchClicked) {
            setIsLoading(true); // Start loading when search is clicked
            const options = {
                method: 'GET',
                url: 'https://bing-web-search1.p.rapidapi.com/search',
                params: {
                    q: query,
                    mkt: 'en-us',
                    safeSearch: 'Off',
                    textFormat: 'Raw',
                    freshness: 'Day',
                },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': '532606fd5amshbfdbc1bd5ff8f44p190eb2jsnc5d1642e27ba',
                    'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com',
                },
            };

            const fetchData = async () => {
                try {
                    const response = await axios.request(options);
                    setResults(response.data.value);
                } catch (error) {
                    console.error(error);
                } finally {
                  setIsLoading(false); // Stop loading when data is received or an error occurred
                }
            };

            fetchData();
        }
    }, [searchClicked, query]);

    const clearResults = () => {
        setResults(null);
        setSearchClicked(false);
        setQuery('');
        setInputValue('');
    };

    return (
        <> 
        {isLoading ? (
          <Loading />
        ) : (  
          <div>  
            <button 
            className='p-4 flex items-center text-3xl cursor-pointer relative z-10' 
            onClick={clearResults}>
                <FcGoogle className='mt-1' size={30}/>OOGLE
            </button>
            <div className='flex flex-row gap-5 relative p-2 z-10'>
                <Link>All</Link>
                <Link to="/images">Images</Link>
            </div>
            <div className='lg:px-[7rem] md:px-[5rem] sm:px-[3rem] xs:px-[2rem]'>  
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
                              name="query"
                              autoComplete="off"
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
                    <div className='lg:w-[50%] md:w-[50%] sm:w-[100%] xs:w-[100%]'>
                      {results.map((result, index) => (
                        <Link to={result?.url} target="_blank" rel="noopener noreferrer" key={index} 
                        className={
                          index === 0 ? 'border border-gray-300 lg:absolute md:absolute lg:block md:block sm:hidden xs:hidden right-10 rounded-xl lg:w-[400px] md:w-[300px] sm:w-[200px] xs:w-[150px] p-3 group' 
                          : 
                          'flex-col p-5 group'
                        }
                        >
                          {index === 0 && <img src={result?.provider[0]?.image?.thumbnail?.contentUrl} alt={result?.name} />}
                          <div className="flex items-center gap-5">
                            <img className='rounded-full' width={25} src={result?.provider[0]?.image?.thumbnail?.contentUrl} alt={result?.name.substring(0, 10)} />
                            <div className="flex flex-col">
                                <a href={result?.url} className='text-lg'>{result?.provider[0]?.name}</a>
                                <a href={result?.url} target="_blank" rel="noopener noreferrer">{new URL(result?.url).hostname}</a>
                            </div>
                          </div>
                          <div>
                            <h2 className='text-lg text-[#1A0DAB]  group-hover:underline'>{result?.name}</h2>
                            <p>{result?.description}</p>
                            <p>{new Date(result?.datePublished).toLocaleString()}</p>
                          </div>
                          <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 p-3">
                          {result?.mentions?.map((mention, index) => (
                            <div  key={index} className="border border-gray-300 w-[150px] rounded-xl p-1 text-sm flex items-center justify-center">
                              <h1>#{mention.name}</h1>
                            </div>
                          ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                    <Landing setSearchClicked={setSearchClicked} setQuery={setQuery} setInputValue={setInputValue}/>
                )}
              </div>
            </div>
            </div>
          )}
        </>
    );
}

export default Home;
