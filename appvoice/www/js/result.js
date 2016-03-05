// contact controller
app.controller('contactController', ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http) {

    $scope.msgarr = [];

    $scope.concatenar = function() {

        
        var string = 
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
        }`; //obj.results[0].alternatives[0].transcript

        var texto = '';

        function logArrayElements(element, index, array) {
            console.log("a[" + index + "] = " + element);

            if (element[1] > 0.7)
              temp = '<i class="texto-verde">' + element[0] + '</i>';
            if (element[1] > 0.3)
              temp = '<i class="texto-amarelo">' + element[0] + '</i>';
            else
              temp = '<i class="texto-vermelho">' + element[0] + '</i>';

            texto += temp + ' ';

        }

        var obj = JSON.parse(string);

        var words = obj.results[0].alternatives[0].word_confidence;
        
        words.forEach(logArrayElements);

        $scope.msgarr.push(texto);

        $scope.chat = $scope.msgarr;

    };


    $scope.uploadPic = function() {
      
      var file = blobg
      
      file.upload = Upload.upload({
        //url: 'http://posttestserver.com/post.php',
        //url: 'http://httpbin.org/post',
        //url: 'http://requesttb.in/xdo45lxd',
        url: 'http://10.0.0.44:8080/upload',
        data: {file: file}
      });
      
      file.upload.then(function (response) {
        
        $timeout(function () {
          file.result = response.data;
        });

      }, function (response) {

        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;

      }, function (evt) {

        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

      });

    }


}]);
