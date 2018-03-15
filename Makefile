all: build

build:
	@docker build --tag=anthonyrawlinsuom/lfmc-staging .

install:
	@docker push anthonyrawlinsuom/lfmc-staging

clean:
	@docker rmi anthonyrawlinsuom/lfmc-staging