$(function() {
    var os = require("os");
    var fs = require("fs");
    var exec = require("exec");

    var tmp_source_file = os.tmpDir() + "kalam.txt";

    function render() {
        var text = $("#source-text").val();

        fs.writeFile(tmp_source_file, text, function(err) {
            if (err) {
                alert(err);
                return;
            }

            var pandoc_command = ["pandoc",
                                    "-f",
                                    "markdown",
                                    "-t",
                                    "html",
                                    "-i",
                                    tmp_source_file];
            exec(pandoc_command, function(err, out, code) {
                $("#preview-html").html(out);
            });
        });
    }

    window.setInterval(render, 3000);
});
