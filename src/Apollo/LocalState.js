export const defaults = {
    markerStatus: localStorage.getItem("markerStatus") !== undefined ? localStorage.getItem("markerStatus") : "text"
    
};


export const resolvers = {
    Query: {
        getMarkerStatus: (_,__,___) => {
            return (localStorage.getItem("markerStatus") || "text")
        }
    },
    Mutation: {

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
