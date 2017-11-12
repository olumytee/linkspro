<template>
  <div class="off-canvas">
    <input type="checkbox" class="off-canvas-checkbox" id="sidebar-checkbox" name="sidebar-checkbox" hidden>
    <!-- off-screen toggle button and close mask -->
    <label class="off-canvas-toggle btn" for="sidebar-checkbox">
      <i class="icon icon-menu"></i>
    </label>

    <div class="off-canvas-sidebar">
      <!-- off-screen sidebar -->
      <sidebar></sidebar>

    </div>
    <div class="off-canvas-body">
      <custom-header title="Add collection"></custom-header>
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column col-6 col-md-12">
                <p>
                  Enter a collection name and get a unique URL you can share accross the web eg enter "football" to get a collection with the link <a href="#">mycoo.link/football</a>
                </p>
              </div>
            </div>
            <p class="text-error" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-success" v-if="successMessage">{{successMessage}}</p>
            <form class="" v-on:submit.prevent="add">
              <div class="columns">
                <div class="column col-2 col-md-12 small-margin">
                  <label class="form-label" for="input-example-1">Collection name</label>
                </div>
                <div class="column col-4 col-md-12 has-icon-right small-margin">
                  <input type="text" class="form-input" placeholder="" v-model="collectionName">
                  <i class="form-icon" :class="{ 'loading': isLoading }"></i>
                </div>
                <div class="column col-2 col-md-12 small-margin">
                  <button class="btn btn-success btn-mod" v-bind:class="{ 'loading': isLoading }" type="submit">Add collection</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import CustomHeader from '@/components/headerIn';
import CustomFooter from '@/components/footer';
import Sidebar from '@/components/sidebar';

export default {
  middleware: 'auth',
  data() {
    return {
      errorMessage: null,
      successMessage: null,
      isLoading: false,
      isAvailable: false,
      collectionName: ''
    };
  },
  components: {
    CustomHeader,
    CustomFooter,
    Sidebar
  },
  methods: {
    add() {
      const regex = new RegExp(
        /^(dashboard|collection|settings|api|error|404)$/i
      );
      if (regex.test(this.collectionName)) {
        this.errorMessage = 'Invalid collection Name';
        return;
      } else {
        this.isLoading = true;
        this.errorMessage = null;
        axios
          .post('/api/collection', {
            collection: this.collectionName
          })
          .then(res => {
            this.collectionName = '';
            this.loginPassword = '';
            this.successMessage = 'Collection added';
            this.isLoading = false;
          })
          .catch(e => {
            console.log(e);
            this.isLoading = false;
            this.errorMessage = e.response.data.message
              ? e.response.data.message
              : 'There was an error';
          });
      }
    }
  }
};
</script>
<style scoped>
.btn-mod {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 1.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  line-height: 1.5;
  padding: 0.5em, 2em;
  border: none;
  background: #a78bde;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 8px 0 rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  transition: 0.5s;
}
.btn-mod:hover {
  background: #ffffff;  
  color: #a78bde;
  text-shadow: none;
  box-shadow: 0 2px 16spx 0 rgba(0, 0, 0, 0.2);
}
.off-canvas .off-canvas-sidebar {
  padding: 0rem;
}

.off-canvas-body {
  min-width: 100%;
}

.container {
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1rem;
}

.form-label {
  padding: 8px 0;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .small-margin {
    margin-bottom: 4px;
  }
}
</style>