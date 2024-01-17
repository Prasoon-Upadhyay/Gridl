import React from 'react'

const RuleCard = ( {num, title, children} ) => {

    return ( 
            <div class="card mt-5" style={{'border': '2px solid #E48F45'}}>
                <div class="card-header" style={{'backgroundColor': '#0f0f0f', 'color': '#E48F45', 'border-bottom': '2px solid #E48F45'}}>
                    Rule#{num}
                </div>
                <div class="card-body p-4" >
                    <h4 class="card-title fw-bolder" style={{'color': '#E48F45'}}>{title}</h4>
                    <p class="card-text">{children}</p> 
                </div>
            </div> 
    )
}

export default RuleCard