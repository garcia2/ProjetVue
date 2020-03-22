<template>
  <header>
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="!this.$store.getters.isLoggedIn">
            <router-link to="/FormConnection">Connexion</router-link>
          </li>
          <li v-if="!this.$store.getters.isLoggedIn">
            <router-link to="/FormRegister">Inscription</router-link>
          </li>

          <li v-if="this.$store.getters.isLoggedIn">
            <p>Connecté en tant que {{user.user_mail}}</p>
          </li>
          <li v-if="this.$store.getters.isLoggedIn">
            <a @click="logout">Deconnexion</a>
          </li>
        </ul>
        <a src="../assets/logo.png" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <router-link to="/Articles">Articles</router-link>
          </li>
          <li v-if="this.$store.getters.isLoggedIn">
            <router-link to="/FormArticle/new">Poster un article</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",

  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("user_token");
      this.$router.push("/articles");
    }
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    }
  }
};
</script>

<style scoped>
</style>
