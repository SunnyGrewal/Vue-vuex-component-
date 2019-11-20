# saint

## Go to the Web App directory
```
cd d:/saint-web-app
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
You can visit on your local: ( https://localhost:8080 ).
To run on http://localhost:8080, go to ( vue.config.js ) file and remove ( https: true ).
But if you do that, you can't log in with facebook.

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

To get token ...
client_id: 19209f7b-6240-464c-b224-bd0f39017626
client_secret: 'abc'

# All Saints    api/v1/{langcode}/allsaints: GET    
methods: GET
formats: json
authentication: oauth2

Edit
List additional actions
Basic Page REST Resource    /api/v1/{langcode}/page/{alias}: GET    
methods: GET
formats: json
authentication: oauth2

Edit
List additional actions
Export languages    /api/v1/languages: GET    
methods: GET
formats: json
authentication: oauth2

# Edit
List additional actions
Lost password    /user/lost-password:
/user/lost-password: POST    
methods: POST
formats: json
authentication: Na

# Edit
List additional actions
Newsfeed resource    /api/v1/{langcode}/newsfeed: GET    
methods: GET
formats: json
authentication: oauth2

Edit
List additional actions
OAuth2 Token Type (read-only)    /entity/oauth2_token_type/{oauth2_token_type}: GET    
methods: GET
formats: json
authentication: oauth2

Edit
List additional actions
OAuth2 token    /admin/content/simple_oauth/{oauth2_token}: GET, PATCH, DELETE
/entity/oauth2_token: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Pin saint resource    /api/v1/addsainttospace/{saint_id}: PUT
/api/v1/addsainttospace/{saint_id}: POST    
methods: PUT
formats: json
authentication: oauth2

Edit
List additional actions
Remove saint resource    /api/v1/removesaintfromspace/{saint_id}: PUT
/api/v1/removesaintfromspace/{saint_id}: POST    
methods: PUT
formats: json
authentication: oauth2

Edit
List additional actions
Remove selfie    /api/v1/selfies/remove/{selfie_id}:
/api/v1/selfies/remove/{selfie_id}: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Reset Lost password Via Temp password    /user/lost-password-reset:
/user/lost-password-reset: POST    
methods: POST
formats: json
authentication: Na

Edit
List additional actions
Saint conversation resource    /api/v1/{langcode}/conversation: GET    
methods: GET
formats: json
authentication: oauth2

Edit
List additional actions
Saint of month resource    /api/v1/addsaintofmonth/{saint_id}: PUT
/api/v1/addsaintofmonth/{saint_id}: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Set notification token resource    /api/v1/notification/token:
/api/v1/notification/token: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Set user languauage resource    /api/v1/setuserlanguage/{langcode}: PUT    
methods: PUT
formats: json
authentication: oauth2

# Edit
List additional actions
Social login resource    //api/v1/social-login:    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Test token resource    /api/v1/fcm/test:
/api/v1/fcm/test: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
Upload selfie resource    /api/v1/selfies/upload:
/api/v1/selfies/upload: POST    
methods: POST
formats: json
authentication: oauth2

Edit
List additional actions
User profile resource    /api/v1/userprofile: GET    
methods: GET
formats: json
authentication: oauth2

# Edit
List additional actions
User registration    /user/register: POST    
methods: POST
formats: json
authentication: oauth2