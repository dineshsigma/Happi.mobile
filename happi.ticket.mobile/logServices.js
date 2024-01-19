import axios from 'axios';
const LogServices =(type, req = null, message,json)=> {
    let types = ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug', "locally"]
    var labels = {
        "level": type,
        "app": "HAPPI-EMPLOYEE-MANAGEMENT",
        env: "dev"
    }
    if (types.indexOf(type) == -1) {
        return;
    }
    if (req != null) {
        labels.path = req.url;
        // labels.method = req.method;
        labels.headers = req.headers;
        labels.app = "HAPPI-EMPLOYEE-MANAGEMENT";
        labels.json = json;
        // labels.query = req.query;
        // labels.params = req.params;
        // if (labels.method.toLowerCase() == "post" || labels.method.toLowerCase() == "put") {
        //     labels.body = req.body
        // }
    }
    let data = {
        "streams": [
            {
                "stream": labels,
                "values": [
                    [
                        new Date().getTime() * 1000 * 1000 + "",
                        //message,
                        // "{\"level\":\"info\",\"message\":\"Hello bananas!\"}",
                        JSON.stringify({
                            "level": type,
                            message: message
                        }),
                    ]
                ]
            }
        ]
    };
    console.log("log4", data);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        //  url: 'https://logs-prod-017.grafana.net/loki/api/v1/push',
        //https://loki.iipl.app/
        url: "https://loki.iipl.app/loki/api/v1/push",
        headers: {
            //'Authorization': 'Basic NDgwMzI2OmdsY19leUp2SWpvaU16WXpNRE0ySWl3aWJpSTZJbk4wWVdOckxURXlOamcxTnkxb2JDMWhjR2tpTENKcklqb2lNVWRYWVRsUU16bFVXbTl6UnpNMVFqUnBOelJETld0S0lpd2liU0k2ZXlKeUlqb2lkWE1pZlgwPQ==',
            'Authorization': 'Basic ZGV2Om1sYmk0YTFpV2FnQUthdw==',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };
    axios.request(config)
        .then((response) => {
            console.log("sent success")
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error.response.data);
        });
  }


  export default LogServices;
