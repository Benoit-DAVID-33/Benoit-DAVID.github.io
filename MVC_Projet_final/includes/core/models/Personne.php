<?php

	class Personne{
		private int $id;
		private string $email, $password, $avatar;
		private ?DateTime $dateNaissance;
		
		public function __construct(string $email = '', string $password = '', ?DateTime $dateNaissance = null, string $avatar= ''){
			
				$this->email = htmlentities($email);
				$this->password = htmlentities($password);
				$this->avatar = $avatar;
				$this->id = 0;

				if (is_null($dateNaissance)){
					$this->dateNaissance = new DateTime('now');
				}else{
					$this->dateNaissance = $dateNaissance;
				}

		}

		public function getId(): int{
			return $this->id;
		}

		public function setId($id): void{
			$this->id = $id;
		}

		public function getEmail(): string{
			return $this->email;
		}

		public function setEmail(string $email): void{
			$this->email = htmlentities($email);
		}

		public function getPassword(): string{
			return $this->password;
		}

		public function setPassword(string $password): void{
			$this->password = htmlentities($password);
		}
		
		public function getAvatar(): string{
			return $this->avatar;
		}

		public function setAvatar(string $avatar): void{
			$this->avatar = $avatar;
		}

		public function getDateNaissance(): DateTime{
			return $this->dateNaissance;
		}

		public function setDateNaissance(DateTime $dateNaissance): void{
			$this->dateNaissance = $dateNaissance;
		}
	};