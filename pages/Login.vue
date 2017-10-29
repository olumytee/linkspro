<template>
  <div class="main">
    <custom-header></custom-header>
    <div class="columns">
      <div class="column">
        <div class="empty emptyMod">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column col-md-12">
          <div class="columns">
            <div class="column col-8 col-md-12">
              <h2>Log in</h2>
              <form v-on:submit.prevent="login">
                <div class="form-group">
                  <label class="form-label" for="input-example-1">Email</label>
                  <input class="form-input" type="email" id="input-example-1" placeholder="john@MyCoolLink" required v-model="loginEmail">
                </div>
                <div class="form-group">
                  <label class="form-label" for="password">Password</label>
                  <input class="form-input" type="password" id="password" required v-model="loginPassword">
                </div>
                <div class="form-group ">
                  <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': inLoading }" type="submit">Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr class="show-md">
        <div class="column col-md-12">
          <div class="columns">
            <div class="column col-8 col-md-12">
              <h2>Sign up</h2>
              <form v-on:submit.prevent="register" autocomplete="off">
                <div class="form-group">
                  <label class="form-label" for="input-example-1">Email</label>
                  <input class="form-input" type="email" id="input-example-1" placeholder="john@MyCoolLink" required v-model="regEmail" readonly onfocus="this.removeAttribute('readonly');">
                </div>
                <div class="form-group">
                  <label class="form-label" for="password">Password</label>
                  <input class="form-input" type="password" id="password" required v-model="regPassword" readonly onfocus="this.removeAttribute('readonly');">
                </div>
                <div class="form-group ">
                  <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': regLoading }" type="submit">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import CustomHeader from '@/components/header';
import CustomFooter from '@/components/footer';

export default {
  data() {
    return {
      formError: null,
      inLoading: false,
      regLoading: false,
      loginEmail: '',
      loginPassword: '',
      regEmail: '',
      regPassword: '',
      message: null,
      messageClass: null
    };
  },
  methods: {
    login() {
      this.inLoading = true;
      this.$store
        .dispatch('login', {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(() => {
          this.loginEmail = '';
          this.loginPassword = '';
          this.inLoading = false;
          this.$router.push('/dashboard');
        })
        .catch(e => {
          this.inLoading = false;
          this.messageClass = 'notification is-danger';
          this.message = e.response.data.message
            ? e.response.data.message
            : 'There was an error';
        });
    },
    register() {
      this.regLoading = true;
      this.$store
        .dispatch('register', {
          email: this.regEmail,
          password: this.regPassword
        })
        .then(() => {
          this.loginEmail = '';
          this.loginPassword = '';
          this.regLoading = false;
          this.$router.push('/dashboard');
        })
        .catch(e => {
          this.regLoading = false;
          this.messageClass = 'notification is-danger';
          this.message = e.response.data.message
            ? e.response.data.message
            : 'There was an error';
        });
    }
  },
  components: {
    CustomHeader,
    CustomFooter
  }
};
</script>

<style scoped>
.container {
  padding-left: 4rem;
  padding-right: 4rem;
}

.emptyMod {
  padding: 0.4rem 0.1rem;
  text-align: left;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
