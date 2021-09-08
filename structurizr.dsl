
workspace "local set" "illustrate document based db"{
    model {
        team = person "Team" "Us" "Customer"
        frontEnd = softwareSystem "Front End React" "Base web app" "Front End"
        nodeBackEnd = softwareSystem "Node Back End" "Standalone API to connect to document DB" "Back End"
        mongoDb = softwareSystem "Database" "Store data" "Database"
        websites = softwareSystem "3rd Party News Source" "Raw Sources of Data" "Front End"
        websitesChild = softwareSystem "Child 3rd Party News Source" "Raw Sources of Data" "Front End"
        aws = softwareSystem "AWS Machine Learning" "Provides Machine Learning and Analytics" "Robot"

        team -> frontEnd "submits websit url"
        frontEnd -> nodeBackEnd "connects to"
        nodeBackEnd -> websites "crawls website"
        websites -> websitesChild "crawls child recursively"
        websites -> nodeBackend "raw body"
        nodeBackEnd -> aws "process topics through machine learning"
        nodeBackEnd -> mongoDb "stores all data in"

    }

    views {
        systemlandscape "SystemLandscape" {
            include *
            autoLayout
        }


        styles {
            element "Customer"{
                shape Person
            }
            element "Robot"{
                shape Robot
            }

            element "Software System" {
                background #1168bd
                color #ffffff
            }
            element "Existing System" {
                background #999999
                color #ffffff
            }
            element "Container" {
                background #438dd5
                color #ffffff
            }
            element "Front End" {
                shape WebBrowser
            }
            element "Mobile App" {
                shape MobileDeviceLandscape
            }
            element "Database" {
                shape Cylinder
            }
            element "Component" {
                background #85bbf0
                color #000000
            }
            element "Failover" {
                opacity 25
            }
        }
    }
}
