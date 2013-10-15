# source files
INPUT = main.js util.js http.js oauth.js endpoints.js request.js streaming.js userstream.js filterstream.js init.js

# output file name
NAME = violet

# output files
COMBINE = ../test/js/$(NAME).js
MINIFY = $(NAME).min.js

COMPRESS = $(MINIFY)

all : $(COMPRESS)

$(COMBINE) : $(INPUT)
	cat $^ > $@

$(COMPRESS) : $(COMBINE)
	java -jar ../bin/compiler.jar --js=$< --js_output_file=$@

.PHONY: clean
clean :
	rm -f $(COMBINE) $(COMPRESS)
