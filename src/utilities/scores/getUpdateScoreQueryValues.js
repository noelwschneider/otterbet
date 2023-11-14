const getUpdateScoreQueryValues = (competition, game) => {
    switch (competition) {
        case 'american-football':
            return [
                game.status,
                game.timer,
                game.home_score,
                game.home_1q,
                game.home_2q,
                game.home_3q,
                game.home_4q,
                game.home_overtime,
                game.away_score,
                game.away_1q,
                game.away_2q,
                game.away_3q,
                game.away_4q,
                game.away_overtime,
                game.id 
            ];
        
        case 'baseball':
            switch (true) {
                case game.home_extra_innings != null:
                    game.timer = 'Extra Innings'                        
                    break;
            
                case game.away_extra_innings != null:
                    game.timer = 'Extra Innings'                        
                    break;

                case game.home_inning_9 != null:
                    game.timer = 'Bottom 9'                        
                    break;

                case game.away_inning_9 != null:
                    game.timer = 'Top 9'                        
                    break;

                case game.home_inning_8 != null:
                    game.timer = 'Bottom 8'                        
                    break;
            
                case game.away_inning_8 != null:
                    game.timer = 'Top 8'                        
                    break;
            
                case game.home_inning_7 != null:
                    game.timer = 'Bottom 7'                        
                    break;
            
                case game.away_inning_7 != null:
                    game.timer = 'Top 7'                        
                    break;
            
                case game.home_inning_6 != null:
                    game.timer = 'Bottom 6'                        
                    break;
            
                case game.away_inning_6 != null:
                    game.timer = 'Top 6'                        
                    break;
            
                case game.home_inning_5 != null:
                    game.timer = 'Bottom 5'                        
                    break;
            
                case game.away_inning_5 != null:
                    game.timer = 'Top 5'                        
                    break;
            
                case game.home_inning_4 != null:
                    game.timer = 'Bottom 4'                        
                    break;
            
                case game.away_inning_4 != null:
                    game.timer = 'Top 4'                        
                    break;
            
                case game.home_inning_3 != null:
                    game.timer = 'Bottom 3'                        
                    break;
            
                case game.away_inning_3 != null:
                    game.timer = 'Top 3'                        
                    break;
            
                case game.home_inning_2 != null:
                    game.timer = 'Bottom 2'                        
                    break;
            
                case game.away_inning_2 != null:
                    game.timer = 'Top 2'                        
                    break;
            
                case game.home_inning_1 != null:
                    game.timer = 'Bottom 1'                        
                    break;
            
                case game.away_inning_1 != null:
                    game.timer = 'Top 1'                        
                    break;
            
                default:
                    break;
            }
            return [
                game.status,
                game.timer,
                game.home_score,
                game.home_inning_1,
                game.home_inning_2,
                game.home_inning_3,
                game.home_inning_4,
                game.home_inning_5,
                game.home_inning_6,
                game.home_inning_7,
                game.home_inning_8,
                game.home_inning_9,
                game.home_extra_innings,
                game.away_score,
                game.home_inning_1,
                game.home_inning_2,
                game.home_inning_3,
                game.home_inning_4,
                game.home_inning_5,
                game.home_inning_6,
                game.home_inning_7,
                game.home_inning_8,
                game.home_inning_9,
                game.home_extra_innings,
                game.id 
            ]
    
        default:
            break;    
    }
}

module.exports = getUpdateScoreQueryValues;