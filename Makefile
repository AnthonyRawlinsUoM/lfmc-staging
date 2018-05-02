all: build install pull

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