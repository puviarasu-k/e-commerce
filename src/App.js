import React, { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import Products from './products';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import userContext from './userContext';
import Forget from './forget';
import Views from './views';
import ProductListing from './productlisting';
import Page from './page';
import Admin from './Admin';
import Home from './components/Home';
import Edit from './components/edit';
import Settings from './components/settings';
import Bookmarks from './components/bookmarks';
import Users from './components/users';
import Product from './components/products';
import Dashboard from './components/dashboard';
import Protected from './protected';
import Tilepage from './tile';
import Productdetailspage from './components/productdetailspage';



function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>

          <Route exact path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<Products />} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/views' element={<Views />} />
          <Route path='/listing' element={<ProductListing />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/productlisting' element={<Tilepage />} />
          <Route path='/details' element={<Productdetailspage />} />

          <Route path='/admin/home' element={<Protected><Home /></Protected>} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/settings' element={<Settings />} />
          <Route path='/admin/bookmarks' element={<Bookmarks />} />
          <Route path='/admin/products' element={<Product />} />
          <Route path='/admin/edit' element={<Edit />} />

          <Route path='/page' element={<Page />} />

          {/* <Route component={NotFound}/> */}

        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
