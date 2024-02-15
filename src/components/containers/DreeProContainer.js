import React, { useEffect, useState } from 'react';
import LaundryPro from "../../models/LaundryPro";
import DreeProLocation from '../dreepro/DreeProLocation';
import "./DreeProContainer.scss"

const DreeProContainer = ({dreePros, currentCoords}) => {

    if (!dreePros) {
        return (
            <div className="dree-pro-container loading">
                <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                </div>
            </div>
            )
    }

    const organizeByDistance = (currentCoords) => {
        if(currentCoords){
            // Clone the array to avoid mutating the original array
            const sortedDreePros = [...dreePros];

            // Sort the array based on distance using haversineDistance method
            sortedDreePros.sort((a, b) => {
                const distanceA = a.handleCalculateDistance(currentCoords);
                const distanceB = b.handleCalculateDistance(currentCoords);

                // Sorting in ascending order, modify as needed
                return distanceA - distanceB;
            });

            return sortedDreePros;
        }
        return [];
    };

  return (
    <div className="dree-pro-container">
        {organizeByDistance(currentCoords).map((dreePro) => (
        <DreeProLocation key={dreePro.id} dreePro={dreePro} currentCoords={currentCoords} />
      ))}
    </div>
  );
};

export default DreeProContainer;
