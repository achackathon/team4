// contact controller
app.controller('contactController', ['$scope', '$http', function($scope, $http) {
    
    $scope.msgarr = [];

    $scope.concatenar = function() {

        //$scope.msgarr.push($scope.teste);

        //obj.results[0].alternatives[0].transcript
        string = 
        `{
          "result_index": 0,
          "results": [
            {
              "final": true,
              "alternatives": [
                {
                  "transcript": "testes de reconhecimento vozes número um ",
                  "confidence": 0.695,
                  "word_confidence": [
                    [
                      "testes",
                      0.40694261822379807
                    ],
                    [
                      "de",
                      0.9731548539995075
                    ],
                    [
                      "reconhecimento",
                      0.9940454623893726
                    ],
                    [
                      "vozes",
                      0.20936127262875345
                    ],
                    [
                      "número",
                      0.9403992487335442
                    ],
                    [
                      "um",
                      0.6803446945862975
                    ]
                  ]
                }
              ]
            }
          ]
        }`;

        var obj = JSON.parse(string);

        console.log(obj);

        $scope.msgarr.push(obj.results[0].alternatives[0].transcript);

        console.log($scope.msgarr);
        
        $scope.chat = $scope.msgarr;


    };


}]);