# TraceWhisper v2: Framework Integration Recipes

To collapse the "Integration Gap," we provide these ready-to-use recipes. The goal is to move from `pip install` to `tw live` in under 60 seconds.

## 1. LangChain Recipe: The "Reasoning Auditor"
**Scenario:** You are using a LangChain agent with a complex toolset and want to audit why it's choosing the wrong tool.

### Integration
```python
import tracewhisper
from tracewhisper.integrations.langchain import TraceWhisperCallback
from langchain.agents import initialize_agent, AgentType
from langchain.llms import OpenAI

# 1. Initialize TraceWhisper
tracewhisper.init()

# 2. Setup your agent as usual
llm = OpenAI(temperature=0)
tools = [...] # Your toolset
agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

# 3. Add the TraceWhisperCallback to the run
# This captures the internal chain-of-thought and tool calls
response = agent.run(
    "Analyze the correlation between X and Y", 
    callbacks=[TraceWhisperCallback()]
)
```

### The "Aha!" Moment
Run `tw live` in a separate terminal. You will see the **Reasoning Path** synthesized. Instead of reading raw LangChain logs, you'll see:
*"The agent attempted to use the Search Tool, but the query was too broad. It then pivoted to the Calculator Tool, which was a mistake because..."*

---

## 2. CrewAI Recipe: The "Collaborative Flow"
**Scenario:** You have a multi-agent crew (e.g., Researcher + Writer) and want to see where the handoff between agents is breaking down.

### Integration
```python
import tracewhisper
from tracewhisper.integrations.crewai import TraceWhisperCrew
from crewai import Agent, Task, Crew

# 1. Initialize TraceWhisper
tracewhisper.init()

# 2. Define your agents and tasks
researcher = Agent(role='Researcher', goal='Find X', ...)
writer = Agent(role='Writer', goal='Write about X', ...)
task1 = Task(description='...', agent=researcher)
task2 = Task(description='...', agent=writer)

# 3. Wrap your Crew with TraceWhisperCrew
# This automatically hooks into the agent-to-agent communication
my_crew = Crew(agents=[researcher, writer], tasks=[task1, task2])
tw_crew = TraceWhisperCrew(my_crew)

# 4. Execute
result = tw_crew.kickoff()
```

### The "Aha!" Moment
Run `tw live`. You can now observe the **Handoff Narrative**. You'll identify if the Writer is failing because the Researcher provided incomplete data, or if the Writer is simply ignoring the instructions.

---

## 3. AutoGen Recipe: The "Conversation Loop"
**Scenario:** You have two agents chatting to solve a problem, but they've entered a "politeness loop" or a circular argument.

### Integration
```python
import tracewhisper
from tracewhisper.integrations.autogen import TraceWhisperAgent

# 1. Initialize TraceWhisper
tracewhisper.init()

# 2. Wrap your AutoGen agents
# Replace the standard AssistantAgent with the TraceWhisper-enabled version
assistant = TraceWhisperAgent(
    name="Assistant",
    system_message="You are a helpful AI assistant.",
    llm_config={"config_list": config_list}
)
user_proxy = TraceWhisperAgent(
    name="User",
    llm_config={"config_list": config_list}
)

# 3. Start the conversation
user_proxy.initiate_chat(assistant, message="Solve this logic puzzle...")
```

### The "Aha!" Moment
Run `tw live`. TraceWhisper will flag **Reasoning Loops**. You'll see a warning: *"Circular Reasoning Detected: Agent A and Agent B have exchanged the same premise 3 times without progressing toward the goal."*

---

## Summary for Developers
| Framework | Integration Effort | Primary Value |
| :--- | :--- | :--- |
| **LangChain** | Low (Callback) | Tool-selection auditing |
| **CrewAI** | Low (Wrapper) | Handoff & Collaboration analysis |
| **AutoGen** | Low (Agent subclass) | Conversation loop detection |
