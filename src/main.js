import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import axios from "axios";

//routes
import Articles from "./components/Articles";
import FormArticle from "./components/Form-Article";
import ArticleDetail from "./components/Article-detail";
import FormRegister from "./components/Form-Register";
import FormConnection from "./components/Form-Connection";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("user_token");
    if (!(token == null || token === undefined)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

const routes = [
  { path: "/Articles", component: Articles },
  { path: "/Article/:article_title", component: ArticleDetail, props: true },
  { path: "/FormArticle/:mode", component: FormArticle, props: true },
  {
    path: "/FormArticle/:mode/:article_title/:article_body",
    component: FormArticle,
    props: true
  },
  { path: "/FormRegister", component: FormRegister },
  { path: "/FormConnection", component: FormConnection },
  { path: "/FormConnection/:message", component: FormConnection, props: true }
];

const store = new Vuex.Store({
  state: {
    articles: [],
    apiUrl: "https://blogapiapidaepapingarcia.herokuapp.com/",
    token: localStorage.getItem("user_token")
  },
  getters: {
    getArticleByTitle: state => title => {
      return state.articles.find(article => article.article_title === title);
    },
    isLoggedIn(state) {
      return state.token != null;
    }
  },
  mutations: {
    updateArticles(state) {
      axios.get(state.apiUrl + "articles").then(response => {
        const articlesData = response.data.articles;
        let articles = [];
        let article;
        for (let id in articlesData) {
          article = articlesData[id];
          articles.push({
            article_date: article.article_date,
            article_body: article.article_body,
            article_title: article.article_title,
            article_owner: {
              user_id: article.article_owner[0].user_id,
              user_mail: article.article_owner[0].user_mail
            }
          });
        }
        state.articles = articles;
      });
    }
  }
});

const router = new VueRouter({
  routes: routes
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
