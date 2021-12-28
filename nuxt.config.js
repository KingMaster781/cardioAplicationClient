export default {
  head: {
    title: 'cardioAplication-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
      ]
    }]
  ],

  axios: {
    proxy: true,
    credentials: true
  },

  
  proxy: {
    '/api/': {
      target: 'http://localhost:8080/cardioAplication/api/',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  build: {
  },

  ssr: false,

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/'
    },
    watchLoggedIn: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: ''
          }
        },
      }
    }
  },
  router: {
    middleware: [
      
    ]
  }
}
