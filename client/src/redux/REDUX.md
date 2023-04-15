### Redux-toolkit kullanarak state yönetimi

Öncelikle redux-toolkit kütüphanesini projemize eklememiz gerekiyor. Bunun için aşağıdaki komutu çalıştırıyoruz.

```js

npm install @reduxjs/toolkit

```

Redux-toolkit kütüphanesini projemize ekledikten sonra redux-toolkit kütüphanesini kullanarak state yönetimini yapacağız. Bunun için öncelikle `redux` adında bir klasör oluşturalım. Bu klasörün içerisinde statelerimizi saklamak ve yönetmek için `store.js` adında bir dosya oluşturalım. Daha sonrasında `features` adında bir klasör daha oluşturarak, meselâ içerisine `authSlice.js` adında bir dosya oluşturalım.

`authSlice.js` dosyasına redux-toolkit içerisindeki `createSlice` ve `createAsyncThunk` fonksiyonlarını import edelim. Bu `createAsyncThunk` fonksiyonu asenkron işlemler yapacağımız için gereklidir. `createSlice` fonksiyonu ise state yönetimini yapacağımız fonksiyondur.

```js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

```

Daha sonrasında ise auth işlemlerini yönetebileceğimiz bir `slice` oluşturalım:

```js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
});


export default authSlice.reducer;

```

Bu `slice`ın adını `auth` olarak belirledik ve başlangıç hâlini/durumunu, `user`'ı `null` olarak, `error`'ı `""` olarak ve `loading`'i `false` olarak belirledik. Daha sonrasında ise `export default authSlice.reducer;` ile bu `slice`'ı dışarıya aktardık. Buradaki `user` state'i, kullanıcı giriş yaptığında, kullanıcı bilgilerini tutacak; `error` state'i, kullanıcı giriş yaparken hata oluşursa, hata mesajını tutacak; `loading` state'i ise kullanıcı giriş yaparken, giriş işleminin tamamlanıp tamamlanmadığını kontrol edecek. Bu state'leri kullanarak, kullanıcı giriş yaparken, giriş işleminin tamamlanıp tamamlanmadığını, hata oluşup oluşmadığını ve kullanıcı bilgilerini kontrol edebileceğiz.

Daha sonrasında ise `store.js` dosyasına aşağıdaki kodları ekleyelim:

```js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});

```

Öncelikle `configureStore` fonksiyonuyla bir `store`, yani state'lerimizi içerisinde saklayabileceğimiz bir depo oluşturduk. Daha sonra bu `store`'a `authReducer`'ı ekledik. Daha sonra oluşturmuş olduğumuz bu `store`'u `index.js` dosyasına aktaralım:

```js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

```

Burada `Provider`'ı kullanarak, `store`'u `App` component'ini sarmalayacak/kuşatacak şekilde tanımladık. Bu sayede `App` component'indeki tüm componentlerde `store` içerisinde saklanan tüm state'lere ulaşabileceğiz. Tüm state'lere ulaşabildiğimizi görmek için Chrome'a Redux eklentisini indirererk uygulamanıza girip `Redux` sekmesine tıkladığınızda, `auth` isimli state'imizin olduğunu ve bu state'in içerisinde `user`, `error` ve `loading` state'lerinin olduğunu göreceksiniz. 
