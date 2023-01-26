describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer
    await page.goto(
      'http://localhost:3001/iframe.html?args=&id=todolist-additemform--add-item-form-idle&viewMode=story'
    )
    const image = await page.screenshot()

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot()
  })
})
