module.exports = {
    apps : [
        {
            name: "aggregate-service",
            script: "./index.js",
            cwd: "C:/Users/m1047877/Desktop/NODE/Node-Restuarant-Mngmt/aggregate-service",
            instances  : 4,
            exec_mode  : "cluster"
        },
        {
            name: "search-management",
            script: "./index.js",
            cwd: "C:/Users/m1047877/Desktop/NODE/Node-Restuarant-Mngmt/search-management",
            instances  : 4,
            exec_mode  : "cluster"
        },
        {
            name: "search-management",
            script: "./index.js",
            cwd: "C:/Users/m1047877/Desktop/NODE/Node-Restuarant-Mngmt/order-management",
            instances  : 4,
            exec_mode  : "cluster"
        }
    ]
}