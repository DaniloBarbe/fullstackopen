sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: O servidor recebe o JSON com a nota e salva
    server-->>browser: HTTP status 201 (Created)
    deactivate server