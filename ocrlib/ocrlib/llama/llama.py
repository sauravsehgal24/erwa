import ollama

model = "llama3.2:1b" #"deepseek-r1:7b"

while True:
    Myprompt = input("You: ")
    answer = ollama.generate(model=model, prompt=Myprompt)
    print("Meta.llama:", answer["response"])