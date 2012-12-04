$(function() {
    var os = require("os");
    var fs = require("fs");
    var exec = require("exec");

    var tmpSourceFile = os.tmpDir() + "kalam.txt";


    function render() {
        var text = $("#source-text").val();

        fs.writeFile(tmpSourceFile, text, function(err) {
            if (err) {
                alert(err);
                return;
            }

            var pandocCommand = ["pandoc",
                                    "-f",
                                    "markdown",
                                    "-t",
                                    "html5",
                                    "-i",
                                    tmpSourceFile];
            exec(pandocCommand, function(err, out, code) {
                $("#preview-html").html(out);
            });
        });
    }


    function readFile(filename) {
        fs.readFile(filename, function(err, data) {
            if (err) {
                alert(err);
                return;
            }

            $("#source-text").val(data);
        });
    }


    function writeFile(filename, content) {
        fs.writeFile(filename, content, "utf8", function() {
            $("#save-success-dialog").reveal();
        });
    }


    $("#choose-file").on("change", function(eventData) {
        var filename = $("#choose-file").val();
        readFile(filename);
    });


    $(".save-to-file").on("click", function() {
        var filename = $("#choose-file").val();
        if (!filename || filename === "") {
            return;
        }
        writeFile(filename, $("#source-text").val());
    });


    window.setInterval(render, 3000);
});
