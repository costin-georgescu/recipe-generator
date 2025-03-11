import './App.css';
import Header from './components/Header';
import SearchField from './components/SearchField';
import useRecipeStore from './stores/recipeStore';
import LoadingSkeleton from './components/LoadingSkeleton';
import Footer from './components/Footer';
import RecipeDisplay from './components/RecipeDisplay';

function App() {
  const { recipe, isLoading } = useRecipeStore();

  return (
    <div
      className={`flex flex-col min-h-screen bg-pattern p-4 sm:p-8 font-sans text-warmstone-800 overflow-x-hidden ${
        recipe ? 'overflow-y-auto' : 'overflow-y-hidden'
      }`}
    >
      <div
        className={`flex-grow mx-auto max-w-5xl w-full flex flex-col transition-all duration-700 ease-in-out ${
          recipe
            ? 'space-y-8 pt-4'
            : 'min-h-[calc(100vh-10rem)] justify-center items-center space-y-8'
        }`}
      >
        <Header />
        <SearchField />

        {isLoading && <LoadingSkeleton />}

        {!isLoading && recipe && <RecipeDisplay />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
