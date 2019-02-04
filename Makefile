all: build install pull

stack:
	npm run-script build
	@docker build --tag=127.0.0.1:5000/lfmc-staging .
	@docker push 127.0.0.1:5000/lfmc-staging

build:
	npm run-script build
	@docker build --tag=anthonyrawlinsuom/lfmc-staging .

install:
	@docker push anthonyrawlinsuom/lfmc-staging
	
pull:
	@docker pull anthonyrawlinsuom/lfmc-staging

release:
	./release.sh

clean:
	@docker rmi --force anthonyrawlinsuom/lfmc-staging