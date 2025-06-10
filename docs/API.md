## Modules

<dl>
<dt><a href="#module_app">app</a></dt>
<dd><p>Main application entry point for the Cost Manager API.
Sets up Express, connects to MongoDB, mounts routers, and starts the server.</p>
</dd>
<dt><a href="#module_db">db</a></dt>
<dd><p>Database connection setup using Mongoose.</p>
</dd>
<dt><a href="#module_controllers/aboutController">controllers/aboutController</a></dt>
<dd><p>Controller for the GET /api/about endpoint.
             Returns a JSON array of team members’ first and last names.</p>
</dd>
<dt><a href="#module_controllers/costController">controllers/costController</a></dt>
<dd><p>Controller functions for handling cost-related API endpoints.</p>
</dd>
<dt><a href="#module_controllers/userController">controllers/userController</a></dt>
<dd><p>Controller for the GET /api/users/:id endpoint.
             Retrieves a single user’s details and computes their total cost.</p>
</dd>
<dt><a href="#module_models/Cost">models/Cost</a></dt>
<dd><p>Mongoose model for tracking individual cost entries.</p>
</dd>
<dt><a href="#module_models/User">models/User</a></dt>
<dd><p>Mongoose model for the User collection.</p>
</dd>
<dt><a href="#module_routes/about">routes/about</a></dt>
<dd><p>Express router for the <code>/api/about</code> endpoint.</p>
</dd>
<dt><a href="#module_routes/costs">routes/costs</a></dt>
<dd><p>Express router for cost-related API endpoints.</p>
</dd>
<dt><a href="#module_routes/users">routes/users</a></dt>
<dd><p>Express router for user-related API endpoints.</p>
</dd>
</dl>

<a name="module_app"></a>

## app
Main application entry point for the Cost Manager API.Sets up Express, connects to MongoDB, mounts routers, and starts the server.

<a name="module_db"></a>

## db
Database connection setup using Mongoose.

<a name="module_db..connectDB"></a>

### db~connectDB() ⇒ <code>Promise.&lt;void&gt;</code>
Connects the application to MongoDB Atlas using Mongoose.Reads connection URI from process.env.MONGO_URI.On failure, logs the error and exits process.

**Kind**: inner method of [<code>db</code>](#module_db)  
**Throws**:

- <code>Error</code> If unable to connect to MongoDB.

<a name="module_controllers/aboutController"></a>

## controllers/aboutController
Controller for the GET /api/about endpoint.             Returns a JSON array of team members’ first and last names.

<a name="module_controllers/aboutController..aboutController"></a>

### controllers/aboutController~aboutController(req, res) ⇒ <code>void</code>
GET /api/aboutReturns a JSON array of team members’ first and last names.Example response (status 200):[  { first_name: "Israel", last_name: "Peled" }]

**Kind**: inner method of [<code>controllers/aboutController</code>](#module_controllers/aboutController)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>express.Request</code> | Express request object. |
| res | <code>express.Response</code> | Express response object; sends JSON array. |

<a name="module_controllers/costController"></a>

## controllers/costController
Controller functions for handling cost-related API endpoints.


* [controllers/costController](#module_controllers/costController)
    * [~addCost(req, res)](#module_controllers/costController..addCost) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~getMonthlyReport(req, res)](#module_controllers/costController..getMonthlyReport) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="module_controllers/costController..addCost"></a>

### controllers/costController~addCost(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
POST /api/addAdds a new cost item.Body (`req.body`) must include:  - description {string}  - category {string} (one of "food","health","housing","sport","education")  - userid {number}  - sum {number}  - date {string|Date} (optional)Responses:  • 200: Returns saved cost JSON.  • 400: Missing required fields.  • 500: Database error.

**Kind**: inner method of [<code>controllers/costController</code>](#module_controllers/costController)  

| Param | Type |
| --- | --- |
| req | <code>express.Request</code> | 
| res | <code>express.Response</code> | 

<a name="module_controllers/costController..getMonthlyReport"></a>

### controllers/costController~getMonthlyReport(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
GET /api/reportReturns monthly cost report for a user.Query (`req.query`) must include:  - id {string|number}  - year {string|number}  - month {string|number}Success (200) returns JSON:{  userid: Number,  year: Number,  month: Number,  costs: [    { food:    [ { sum:Number, description:String, day:Number } ] },    { health:  [ { sum:Number, description:String, day:Number } ] },    { housing: [] },    { sport:   [ { sum:Number, description:String, day:Number } ] },    { education:[ { sum:Number, description:String, day:Number } ] }  ]}Responses:  • 200: Report JSON.  • 400: Missing id/year/month.  • 500: Database error.

**Kind**: inner method of [<code>controllers/costController</code>](#module_controllers/costController)  

| Param | Type |
| --- | --- |
| req | <code>express.Request</code> | 
| res | <code>express.Response</code> | 

<a name="module_controllers/userController"></a>

## controllers/userController
Controller for the GET /api/users/:id endpoint.             Retrieves a single user’s details and computes their total cost.

<a name="module_controllers/userController..getUser"></a>

### controllers/userController~getUser(req, res) ⇒ <code>Promise.&lt;void&gt;</code>
Retrieves details of a single user by ID and calculates the total cost.

**Kind**: inner method of [<code>controllers/userController</code>](#module_controllers/userController)  
**Status**: 200 - OK with JSON of user’s first_name, last_name, id, and total cost.  
**Status**: 404 - Not Found if user with given ID does not exist.  
**Status**: 500 - Server Error if aggregation or database query fails.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>express.Request</code> | Express request object; expects req.params.id to be the user ID (string or number). |
| res | <code>express.Response</code> | Express response object; returns JSON object:    {      first_name: string,      last_name: string,      id: number,      total: number    } |

<a name="module_models/Cost"></a>

## models/Cost
Mongoose model for tracking individual cost entries.


* [models/Cost](#module_models/Cost)
    * [~costSchema](#module_models/Cost..costSchema) : <code>mongoose.Schema.&lt;Cost&gt;</code>
    * [~Cost](#module_models/Cost..Cost) : <code>Object</code>

<a name="module_models/Cost..costSchema"></a>

### models/Cost~costSchema : <code>mongoose.Schema.&lt;Cost&gt;</code>
Mongoose schema for Cost collection.

**Kind**: inner constant of [<code>models/Cost</code>](#module_models/Cost)  
<a name="module_models/Cost..Cost"></a>

### models/Cost~Cost : <code>Object</code>
**Kind**: inner typedef of [<code>models/Cost</code>](#module_models/Cost)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| description | <code>string</code> | Description of the cost item (required). |
| category | <code>string</code> | Category of the cost; one of "food", "health", "housing", "sport", "education" (required). |
| userid | <code>number</code> | ID of the user who incurred the cost (required). |
| sum | <code>number</code> | Amount of the cost (required, min: 0). |
| date | <code>Date</code> | Date when the cost was created; defaults to now. |

<a name="module_models/User"></a>

## models/User
Mongoose model for the User collection.


* [models/User](#module_models/User)
    * [~UserSchema](#module_models/User..UserSchema) : <code>mongoose.Schema.&lt;User&gt;</code>
    * [~User](#module_models/User..User) : <code>Object</code>

<a name="module_models/User..UserSchema"></a>

### models/User~UserSchema : <code>mongoose.Schema.&lt;User&gt;</code>
Mongoose schema for User collection.

**Kind**: inner constant of [<code>models/User</code>](#module_models/User)  
<a name="module_models/User..User"></a>

### models/User~User : <code>Object</code>
**Kind**: inner typedef of [<code>models/User</code>](#module_models/User)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Unique user ID (required). |
| first_name | <code>string</code> | First name (required). |
| last_name | <code>string</code> | Last name (required). |
| birthday | <code>Date</code> | Birth date (required). |
| marital_status | <code>string</code> | One of "single", "married", "divorced", "widowed" (required). |

<a name="module_routes/about"></a>

## routes/about
Express router for the `/api/about` endpoint.

<a name="module_routes/about..router"></a>

### routes/about~router : <code>express.Router</code>
Express router instance.

**Kind**: inner constant of [<code>routes/about</code>](#module_routes/about)  
<a name="module_routes/costs"></a>

## routes/costs
Express router for cost-related API endpoints.

<a name="module_routes/costs..router"></a>

### routes/costs~router : <code>express.Router</code>
Express Router for `/api/add` and `/api/report`.

**Kind**: inner constant of [<code>routes/costs</code>](#module_routes/costs)  
<a name="module_routes/users"></a>

## routes/users
Express router for user-related API endpoints.

<a name="module_routes/users..router"></a>

### routes/users~router : <code>express.Router</code>
Express Router for `/api/users/:id`.

**Kind**: inner constant of [<code>routes/users</code>](#module_routes/users)  
