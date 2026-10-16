import { useState, type FormEvent } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";

export const Check = () => {
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = event.target as HTMLFormElement;
    const pass = password.value;
    const url = "http://localhost:8000/router/check";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pass),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Card className="max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="check-password">Comprobar contraseña</Label>
          <TextInput
            id="check-password"
            type="text"
            value={password}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Introduce una contraseña"
          />
        </div>

        <Button type="submit">Comprobar</Button>
      </form>
    </Card>
  );
};
