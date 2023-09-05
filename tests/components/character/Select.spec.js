import { shallowMount } from "@vue/test-utils";
import Select from "@/components/character/Select.vue";
import { useCharacterStore } from "@/stores/CharacterStore";

jest.mock("mande");

describe("Select.vue", () => {
  let characterStore;

  beforeEach(() => {
    characterStore = useCharacterStore();
    characterStore.characters = [];
    characterStore.selectedCharacter = null;
    characterStore.searchedCharacter = null;
  });

  it("updates selectedCharacter in store when handleCharacterSelection is called", async () => {
    const wrapper = shallowMount(Select);
    await wrapper.vm.handleCharacterSelection({ id: 1 });

    expect(characterStore.selectedCharacter).toEqual({ id: 1 });
  });

  it("searches characters and updates store on searchCharacters call", async () => {
    const mockResults = {
      data: {
        results: [
          /* algunos personajes mockeadas */
        ],
      },
    };
    mande.get.mockResolvedValueOnce(mockResults);
    const wrapper = shallowMount(YourComponentName);
    await wrapper.vm.searchCharacters();

    expect(characterStore.characters).toEqual(mockResults.data.results);
  });

  it("displays the correct number of characters in .characters-counter", async () => {
    characterStore.characters = [{}, {}, {}]; // Mock 3 personajes

    const wrapper = shallowMount(YourComponentName);
    const counter = wrapper.find(".characters-counter p");
    expect(counter.text()).toBe("3");
  });
});
