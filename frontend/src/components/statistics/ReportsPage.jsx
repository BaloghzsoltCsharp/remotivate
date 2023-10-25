import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./ReportsPage.css";
import Donut from "./Donut";
import Bar from "./Bar";
import Line from "./Line";
import Spark from "./Sparkline";

const Reports = () =>{



    return(
        <div className="App">
      <div className="container">
        <h1>Reports</h1>
        <div class="flex-container"> 
            <div className="section donut">
                <Donut/>     
            </div>
            <div className="section bar">
                <Bar />     
            </div>
            <div className="section line">
                <Line/>    
            </div>
            <div className="section spark">
                <Spark/>    
            </div>
        </div>
        
        
            
      </div>
    </div>
    )
}
export default Reports;