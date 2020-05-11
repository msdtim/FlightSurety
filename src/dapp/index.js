
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });

        for (let i = 0; i < contract.flights.length; i++) {

            contract.flights[i].timestamp = Math.floor(Date.now() / 1000);
            console.log("Timestamp of flight: "+contract.flights[0].timestamp);
            contract.registerFlight(contract.flights[i], (error, result) => {
                console.log(error)
                display('Flight', 'Register flights', [ { label: 'Insurance Available for', error: error, value: contract.flights[i].flight} ]);
                // Retrieve the information for the flight just registered to the Blockchain
            });
        }
    

        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flight = null;
            let flightCode = DOM.elid('flight-number').value;
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightCode) {
                    flight = contract.flights[i];
                    break;
                }
            }
            flight.landed = true;
            // Write transaction
            if (flight != null) {
                contract.fetchFlightStatus(flight, (error, result) => {
                    display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
                });
            }
        })

        DOM.elid('check-status').addEventListener('click', () => {
            let flight = null;
            let flightCode = DOM.elid('flight-number').value;
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightCode) {
                    flight = contract.flights[i];
                    break;
                }
            }
            // Write transaction
            if (flight != null) {
                contract.checkFlightStatus(flight, (error, result) => {

                    let status = "Unknown";
                    if (result == 10) {
                        status = "On time";
                    } else if (result == 20) {
                        status = "Late due to airline";
                    } else if (result == 30) {
                        status = "Late due to weather";
                    } else if (result == 40) {
                        status = "Late due to technical reasons";
                    } else if (result == 50) {
                        status = "Late due to other reasons";
                    } else if (result == 60) {
                        status = "Late due to airline, and processed";
                    }
                    

                    display('Flight', 'Check status', [ { label: 'Flight Status', error: error, value: status} ]);
                });
            }
        })
    
        DOM.elid('buy').addEventListener('click', () => {
            let flight = null;
            let flightCode = DOM.elid('flight-number').value;
            for(let i = 0; i < contract.flights.length; i++) {
                if(contract.flights[i].flight == flightCode) {
                    flight = contract.flights[i];
                    break;
                }
            }
            if (flight.landed) {
                display('Passenger', 'Buy Insurance', [ { label: 'Flight ', error: null, value: flight.flight + ' has landed, you cannot buy insurance for landed flights' }]);
            } else if (flight != null) {
                let premium = DOM.elid('insurance-premium').value;
                console.log(flight);
                console.log(premium);
                contract.buy(flight, premium, (error, result) => {
                    console.log(error, result);
                    display('Passenger', 'Buy Insurance', [ { label: 'Flight ', error: error, value: flight.flight + ' for ' + premium + ' wei'} ]);
                });
            }
        })

        DOM.elid('balance').addEventListener('click', () => {

            contract.getBalance((error, result) => {
                console.log(error, result);
                display('Passenger', 'Balance', [ { label: 'Current balance: ', error: error, value: result} ]);
            });
        })

        DOM.elid('withdraw').addEventListener('click', () => {

            contract.withdraw((error, result) => {
                console.log(error, result);
                display('Passenger', 'Withdraw', [ { label: 'Withdraw: ', error: error, value: 'Successful'} ]);
            });
        })
    });
    

})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}







