export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false,
    markerStatus: localStorage.getItem("markerStatus") !== undefined ? localStorage.getItem("markerStatus") : "text"
    
};


export const resolvers = {
    Query: {
        getMarkerStatus: (_,__,___) => {
            return (localStorage.getItem("markerStatus") || "text")
        }
    },
    Mutation: {
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token",token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();
            return null;
        },

        Check: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();
            return null;
        },

        toggleMarkerStatus: (_,  __, {cache}) => {
            let markerStatus;
            if (localStorage.getItem("markerStatus") === "percent") {
                markerStatus = "text";

            } else if (localStorage.getItem("markerStatus") === "text") {
                markerStatus = "percent";

            } else {
                markerStatus = "text";
            }
            localStorage.setItem("markerStatus",markerStatus);

            cache.writeData({
                data: {
                    markerStatus: markerStatus
                }
            });
            console.log(localStorage.getItem("markerStatus"));

            return markerStatus;
        }
    }
};