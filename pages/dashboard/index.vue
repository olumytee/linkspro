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
      <custom-header title="Dashboard"></custom-header>
      <div class="container">
        <div class="columns">
          <div class="column col-10 col-md-12">
            <div class="empty" v-if="!$store.state.collectionsTable">
              <p class="empty-subtitle">You can add multiple collections, add a collection to get started.</p>
              <div class="empty-action">
                <a class="btn btn-primary" href="/dashboard/add-collection">Add collection</a>
              </div>
            </div>
            <div class="" v-else>
              <h3>Your collections</h3>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Links</th>
                    <th>Short URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody v-if="$store.state.collectionsTable">
                  <tr class="" v-for="item in $store.state.collectionsTable" :key="item._id">
                    <td>
                      <a :href="'/' + item.username" target="_blank"> {{item.username}} </a>
                    </td>
                    <td>{{item.links.length || 0 }}</td>
                    <td>{{`https://mycoo.link/${item.username}` }}</td>
                    <td>
                      <div class="">
                        <button class="btn btn-action" @click="remove(item.username)">
                          <i class="icon icon-delete"></i>
                        </button>
                        &nbsp;
                        <button class="btn btn-action">
                          <i class="icon icon-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      formError: null,
      isLoading: false,
      formUsername: '',
      count: null
    };
  },
  filters: {
    formatLink(val) {
      return `https://mycoo.link/${val}`;
    }
  },
  mounted() {
    this.initData();
  },
  components: {
    CustomHeader,
    CustomFooter,
    Sidebar
  },
  filters: {},
  methods: {
    initData() {
      this.$store
        .dispatch('load_dashboard')
        .then(res => {
          console.log('done');
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    },
    remove(username) {
      console.log(username);
      this.$store
        .dispatch('delete_collection', { username: username })
        .then(res => {
          console.log('done');
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    }
  }
};
</script>
<style>
.off-canvas .off-canvas-sidebar {
  padding: 0rem;
}

.off-canvas-body {
  min-width: 100%;
}

.container {
  padding-left: 1rem;
  padding-right: 4rem;
  padding-top: 1rem;
}

@media only screen and (max-width: 840px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.loader {
  color: #8080ff;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}

@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }

  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }

  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }

  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }

  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }

  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }

  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }

  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }

  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }

  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }

  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* <div class="loader">Loading...</div> */

@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>